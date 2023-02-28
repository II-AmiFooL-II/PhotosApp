import { CardMedia, CardContent,Card,Typography,Modal} from '@mui/material'
import { useState,useEffect } from 'react';
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Unsplash, { toJson } from "unsplash-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@material-ui/core/styles";
import '../styles/imageThumbnailsList.scss';
import '../styles/imageModal.scss';
const Home = ()=>{
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
    
    if (windowSize[0] <= 768 && windowSize[0] > 425){
        var clms = 2
    }
    else if (windowSize[0] <= 425 && windowSize[0]>=0){
        clms = 1
    }
    else if (windowSize[0]>768){
        clms = 4;
    }
    const [itemData,setItemData] = useState([]);
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    const [imgsLoaded, setImgsLoaded] = useState(false)

    const handleOpen = (index) => {
        setIdx(index)
        setOpen(true);
    };
    const handleClose = () => {
        setIdx(0)
        setOpen(false);
    };
    
    const unsplash = new Unsplash({
        accessKey: "43UkI0biv6QHuKkxKEa7224rc0R-qzi-ofMhUGiT2pg",
    });
    
    const searchPhotos = async (e)=>{
        
        unsplash.search
        .photos(e, 1, 20)
        .then(toJson)
        .then((json) => {
            setItemData(json.results);
        });
    }
    const getRandom = async ()=>{
       return axios.get("https://api.unsplash.com/photos/?client_id=43UkI0biv6QHuKkxKEa7224rc0R-qzi-ofMhUGiT2pg")
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        e.target.reset();
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
    };
    useEffect(()=>{
        getRandom()
        .then((res)=>{
            setItemData(res.data)
            console.log("hi")
            setImgsLoaded(true)
        })
        .catch((err)=>{
            console.log("Failed to load images", err)
        })
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },[])
    
    return(
        <div style={{"paddingLeft":"3vw","paddingRight":"3vw","paddingTop":"3vw"}}>
            <form className="form" onSubmit={handleSubmit}> 
                <label className="label" htmlFor="query"> 
                {" "}
                📷
                </label>
                <input
                type="text"
                name="query"
                className="input"
                placeholder={`Try "dog" or "apple"`}
                
                onChange={(e)=>searchPhotos(e.target.value)}
                />
                <button type="submit" className="button">
                Search
                </button>
            </form>
            <Masonry columns={clms} spacing={2} style={{"margin":"0"}}>
                
                {imgsLoaded ? itemData.map((item, index) => (
                    <Card key={item.id} onClick={()=>handleOpen(index)}>
                        <CardMedia  component="img" image={`${item.urls.thumb}?w=248&fit=crop&auto=format`}/>
                            <CardContent style={{"padding":"0.25vw","display":"flex"}}>
                                
                                <Typography gutterBottom  style={{"marginTop":"auto","marginBottom":"auto","textAlign":"center","paddingLeft":"0.25vw","fontFamily":'sans-serif',"fontWeight":"600"}} component='div'>
                                    {item.user.username}
                                </Typography>
                                    
                                
                                
                            </CardContent>
                            <div style={{"paddingLeft":"0.5vw"}}>
                                    <Typography gutterBottom  component='span'>
                                        Likes:{item.likes}
                                    </Typography>
                            </div>
                    </Card>
                    
                )) :(<Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>)}
            </Masonry>
            
            {imgsLoaded ?(<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          
            {open && <div className="image-list-container" >
                <div className='image-list-contents' id='modal-content'>
                    <img className='image' src={itemData[idx].urls.raw} alt={itemData[idx].alt_description}/>
                    <div className='image-details'>
                        <p><FontAwesomeIcon className='social-icons' icon={faUser} size="sm"/>{itemData[idx].user.name}</p>
                        <p><FontAwesomeIcon className='social-icons likes' icon={faHeart} size="sm"/>{itemData[idx].likes}</p>
                        {itemData[idx].user.social.instagram_username && <p><FontAwesomeIcon className='social-icons' icon={faInstagram} size="sm"/>{itemData[idx].user.social.instagram_username}</p>}
                       {itemData[idx].user.social.twitter_username && <p><FontAwesomeIcon className='social-icons twitter' icon={faTwitter} size="sm" />{itemData[idx].user.social.twitter_username}</p>}
                        
                    </div>
                </div>
            </div>}
          </Typography>
        </Box>
    </Modal>):(<></>)}
            
        </div>
    );
};

export default Home;