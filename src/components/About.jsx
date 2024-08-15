import React, { useState } from 'react';
import './About.css';
import link from '../assets/link.png';
import search from '../assets/search.png';
import axios from 'axios';
import languages from './data';

function About() {
    const [answer, setAnswer] = useState('');
    const [url, setUrl] = useState('');
    const [language, setLanguage] = useState('');
    const [length, setLength] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // State for error message

    const fetchData = async (url) => {
        setLoading(true);
        setError(''); // Clear previous errors
        const options = {
            method: 'GET',
            url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
            params: {
                url: url,
                lang: language,
                length: length,
                engine: '2'
            },
            headers: {
                'x-rapidapi-key':'4ae73724abmsh2a79dd413d916f6p15e89ejsna0fd8439a43d', // Use the key from .env file
                'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
            }
        };
        
        try {
            const response = await axios.request(options);
            if (response.data.summary) {
                setAnswer(response.data.summary); // Update the answer state
            } else {
                setError('No summary available.'); // Error if no summary returned
            }
        } catch (error) {
            if (error.response) {
                // API returned an error response
                setError(`Error: ${error.response.data.message || 'Something went wrong.'}`);
            } else if (error.request) {
                // Request was made but no response received
                setError('No response from server.');
            } else {
                // Something else went wrong
                setError(`Error: ${error.message}`);
            }
            setAnswer(''); // Clear any previous answers
        } finally {
            setLoading(false); // End the loading state
        }
    };

    function handleChange(e) {
        setUrl(e.target.value);
    }

    function handleLanguage(e) {
        setLanguage(e.target.value);
    }

    function handleLength(e) {
        setLength(e.target.value);
    }

    function handleClick() {
        if (url.trim() === '') {
            setError('URL cannot be empty.');
            return;
        }
        // Validate URL format (simple validation)
        try {
            new URL(url);
            fetchData(url);
        } catch (e) {
            setError('Invalid URL format.');
        }
    }
    
    return (
        <div className='about'>
            <div className='about-ele'>
                <div className='about-main'>
                    <h1 className='main-heading montserrat'>
                        Summarize Article with <br />
                        <span className='span montserrat'>OpenAI GPT-4</span>
                    </h1>
                </div>
                <div className='about-para'>
                    <p className='para montserrat'>
                        Simplify your reading with Summarize, an open-source article
                        summarizer that transforms lengthy articles into clear and concise
                        summaries.
                    </p>
                </div>
                <form>
                    <div className='input-bar'>
                        <img src={link} width='20px' alt='link icon' />
                        <input type='url' value={url} onChange={handleChange} placeholder='Search for Url' />
                        <img src={search} className='searchIcon' width='20px' alt='search icon' onClick={handleClick} />
                    </div>
                </form>
                
                {/*BUTTONS*/}
                <div className='options'>
                    <div className='language montserrat'>
                        <select id="options" value={language} onChange={handleLanguage}>
                            <option key="English" value="en">English</option>
                            {languages.map((lang) => (
                                <option key={lang.name} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='length montserrat'>
                        <select id="length" value={length} onChange={handleLength}>
                            <option key="small" value={2}>5 Lines</option>
                            <option key="medium" value={8}>10 Lines</option>
                            <option key="big" value={12}>14 Lines</option>
                        </select>
                    </div>
                </div>
                
                {/*heading*/}
                <h2 className='montserrat'>Summary</h2>

                {/*error message*/}
                {error && <div className='error-message montserrat'>{error}</div>}

                {/*answer*/}
                <div className="summary">
                    <p className='answer montserrat'>{loading ? 'Loading...' : answer ? answer : "...Your summary will be here"}</p>
                </div>
            </div>
        </div>
    );
}

export default About;
