import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useLocation , useNavigate} from 'react-router-dom';
import './static/Home.css';
import { useParams } from 'react-router-dom';


const Home = (req,res) => {
    console.log(res.body)

    const { userEmail } = useParams();


  const [newLink, setNewLink] = useState('');
  const [linkname, setlinkname] = useState('');

  const [hyperlinksString, setHyperlinksString] = useState('');
  const [hyperlinks, setHyperlinks] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token){
      setIsLoggedIn(true);
    }
    fetchHyperlinks();
  }, []);


  const fetchHyperlinks = async () => {
    try {
        

      const response = await axios.get(`https://mean-project-ten.vercel.app//home/${userEmail}`);
      setHyperlinksString(JSON.stringify(response.data));
      setHyperlinks(JSON.parse(JSON.stringify(response.data)));
      console.log(typeof(response.data))



    } catch (error) {
      console.error('Error fetching hyperlinks:', error);
    }
  };




  const location = useLocation();

  const handleSubmit = async () => {
    try {
      await axios.post(`https://mean-project-ten.vercel.app/home`, { link: newLink , linkname: linkname ,user:userEmail});
      setNewLink('');
      setlinkname('');
      fetchHyperlinks();
    } catch (error) {
      console.error('Error submitting hyperlink:', error);
    }
  };

  const history = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    // Clear any authentication tokens or user data from local storage or cookies
    localStorage.removeItem('accessToken'); // Example: Remove access token from local storage
    // Redirect the user to the login page
    history('/');
  };





  return (
    <div className='main'>
          <div className='container'>
      {isLoggedIn ?(
        <div className='logout-container'>
        <button onClick={handleLogout}>Logout</button>
      </div>):(<div></div>
      )}
  
        <div className='hyperlinks-container'>
        <div className='user'>
        <p>{userEmail}</p>
        </div>
      <ul>
        
      {hyperlinks.map((link, index) => (
          <li key={index}>
            <p> <a href={link.link} target="_blank">{link.linkname}</a></p>
          </li>
        ))}
      </ul>
    </div>
    {isLoggedIn ? (
      <div className="link-inputs">
      <input type='text' value={linkname} onChange={(e) => setlinkname(e.target.value)} placeholder='Enter link name'/>
    <input type="text" value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Enter a new link" />
    <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    ):(
    <div></div>)}
        
    

      

    </div>
    </div>
    
    

  );
};

export default Home;
