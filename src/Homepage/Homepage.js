import React, { useState, useEffect, useRef } from 'react';
import './Homepage.css'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Homepage.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


// imported icons
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";


        

export default function Homepage() {

    const words = ['Code Vibes', 'Web Design', 'Frontend Dev', 'Backend Magic']; // Array of words to cycle through
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0); // To track the current word
  const [charIndex, setCharIndex] = useState(0); // To track the current character
  const [isDeleting, setIsDeleting] = useState(false); // To manage typing/deleting

  useEffect(() => {
    let typingSpeed = isDeleting ? 75 : 150; // Faster when deleting, slower when typing
    const currentWord = words[wordIndex];

    const type = setTimeout(() => {
      // Logic for typing and deleting
      setDisplayedText(currentWord.substring(0, charIndex));

      if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        // Start deleting after word is fully typed
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        // Move to next word after deletion is complete
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length); // Loop through words
      }
    }, typingSpeed);

    return () => clearTimeout(type); // Clear timeout to prevent memory leaks
  }, [charIndex, isDeleting, wordIndex, words]);



  const projects = [
    { id: 1, name: 'D-Express', image: 'https://i.imgur.com/UkbkYbI.jpeg', link: 'https://mohamedreddam1.github.io/dExpress/' },
    { id: 2, name: 'Foodi', image: 'https://i.imgur.com/HPZ3jHz.jpeg', link: 'https://mohamedreddam1.github.io/foodi/' },
    { id: 3, name: 'Epic', image: 'https://i.imgur.com/CFN12Qv.jpeg', link: 'https://github.com/MohamedReddam1/Epic_v8' },
    { id: 4, name: 'Reddam Decor', image: 'https://i.imgur.com/I0kmfv6.jpeg', link: 'https://mohamedreddam1.github.io/reddamdecor/' },
    { id: 5, name: 'Cafe Figaro', image: 'https://i.imgur.com/JFsDK3S.jpeg', link: 'https://mohamedreddam1.github.io/figaro/' },
];

//contact form

const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };




  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    const [navBackground, setNavBackground] = useState(false); // State for background change on scroll

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Change navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavBackground(true);
            } else {
                setNavBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className='h-screen overflow-y-scroll scrollbar-custom'>

        
      
        {/* navbar */}
        <div
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ease-in-out ${navBackground ? 'bg-[#0f1120]' : 'bg-[#f3f5f9]'}`}
        >
            <div className="flex justify-between lg:justify-around items-center w-full md:px-10">
                {/* Logo */}
                <div>
                    <img src="https://i.imgur.com/VqKOMWL.png" alt="Logo" className="px-3 lg:px-0 w-[110px]" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex justify-between items-center text-gray-800">
                    <li className="uppercase list-none mx-5">
                        <a href="#">Home</a>
                    </li>
                    <li className="uppercase list-none mx-5">
                        <a href="#about">About Us</a>
                    </li>
                    <li className="uppercase list-none mx-5">
                        <a href="#contact">Contact Us</a>
                    </li>
                </div>

                {/* Hire Us Button */}
                <div className="hidden md:block">
                    <a
                        href="#"
                        className="py-3 px-10 border border-blue-600 text-blue-600 font-semibold uppercase hover:bg-blue-600 hover:text-white duration-200 ease-in-out"
                    >
                        Hire Us
                    </a>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden px-3">
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                        {/* Hamburger Icon */}
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`w-3/4 fixed inset-0 bg-[#0f1120] text-white transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:hidden`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <li className="uppercase list-none text-2xl">
                        <a href="#" onClick={toggleMenu}>
                            Home
                        </a>
                    </li>
                    <li className="uppercase list-none text-2xl">
                        <a href="#about" onClick={toggleMenu}>
                            About Us
                        </a>
                    </li>
                    <li className="uppercase list-none text-2xl">
                        <a href="#contact" onClick={toggleMenu}>
                            Contact Us
                        </a>
                    </li>
                    <a
                        href="#"
                        className="py-3 px-10 border border-blue-600 text-blue-600 font-semibold uppercase hover:bg-blue-600 hover:text-white duration-200 ease-in-out"
                        onClick={toggleMenu}
                    >
                        Hire Us
                    </a>
                </div>
            </div>
        </div>


        {/* hero */}
        <div className="bg-[#f3f5f9] grid grid-cols-1 lg:grid-cols-2 py-44 px-6 xl:py-44 xl:px-28 items-center">
            <div className=' px-0 '>
                <h1 className="text-3xl text-wrap sm:text-4xl md:text-5xl lg:text-5xl lg:w-4/5 xl:text-6xl font-bold text-black uppercase text-start pr-0 md:pr-10 lg:pr-44 w-full md:w-[700px]">
                    Building Tomorrow’s Web, Today
                </h1>
                <p className="text-black text-base sm:text-lg my-5 md:my-8 lg:my-10 w-full md:w-[400px] lg:w-[500px] text-start">
                    Innovative, scalable web solutions tailored to elevate your digital presence. Let’s craft the future of your online business together.
                </p>
                <div className="flex justify-start items-center text-3xl md:text-4xl text-black">
                    <FaInstagram className="mx-2 md:mx-3"/>
                    <FaFacebookSquare className="mx-2 md:mx-3"/>
                    <FaLinkedin className="mx-2 md:mx-3"/>
                    <BsTwitterX className="mx-2 md:mx-3"/>
                </div>
            </div>

            <div className='hidden lg:flex justify-center lg:ml-10 xl:ml-44'>
                <img src="https://i.imgur.com/1X3Bcvn.jpeg" alt="" className='lg:w-[300px] xl:w-[500px] rounded rounded-t-full rounded-b-3xl'/>
            </div>
            
        </div>


        {/* About */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0f1120]" id="about">
            <div className="">
                <img
                    src="https://i.imgur.com/QscLoGK.jpeg" 
                    alt="Programming background"
                    className="w-full h-auto object-cover" 
                />
            </div>
            <div className="flex flex-col justify-center items-start text-white px-5 md:px-10 lg:px-20 py-10 md:py-10">
                <p className="text-blue-600 py-2 px-5 md:px-10 border border-blue-600 rounded-full text-sm sm:text-base md:text-lg">
                    About
                </p>
                <div className="flex justify-start items-center text-3xl sm:text-4xl md:text-5xl font-bold my-5">
                    <h1>{displayedText}</h1>
                    <span className="">|</span> {/* Optional: a blinking cursor */}
                </div>
                <p className="text-start mt-5 text-sm sm:text-base md:text-lg">
                    At Code Vibes, we build modern, responsive websites that bring your brand to life. 
                    Our team of passionate developers creates seamless, high-performing web solutions 
                    tailored to your needs. From sleek design to robust functionality, we turn your vision 
                    into a digital experience that resonates. Let’s craft your online presence together!
                </p>
            </div>
        </div>


        {/* Our Works */}
        <div className='hidden lg:block lg:flex-col bg-[#0f1120] p-4 md:p-8 lg:p-16'>
            <div className='text-center mb-8'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold'>Our Works</h1>
            </div>
            <div className='p-4 md:p-8'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    loop={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="slide-content">
                                <img src={project.image} alt={project.name} className="project-image" />
                                <div className="overlay">
                                    <h3>{project.name}</h3>
                                    <a href={project.link} className="view-btn">See Project</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>


        <div className='hidden md:flex md:flex-col bg-[#0f1120] p-4 md:p-8 lg:p-16 lg:hidden'>
            <div className='text-center mb-8'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold'>Our Works</h1>
            </div>
            <div className='p-4 md:p-8'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="slide-content">
                                <img src={project.image} alt={project.name} className="project-image" />
                                <div className="overlay">
                                    <h3>{project.name}</h3>
                                    <a href={project.link} className="view-btn">See Project</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

        <div className='flex flex-col bg-[#0f1120] p-4 md:p-8 lg:p-16 md:hidden'>
            <div className='text-center mb-8'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold'>Our Works</h1>
            </div>
            <div className='p-4 md:p-8'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="slide-content">
                                <img src={project.image} alt={project.name} className="project-image" />
                                <div className="overlay">
                                    <h3>{project.name}</h3>
                                    <a href={project.link} className="view-btn">See Project</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>


        {/* Contact Form */}
        <div className='grid grid-cols-1 md:grid-cols-2 bg-[#f3f5f9] py-10 p-4 md:p-8 lg:p-28' id='contact'>
            <div className='flex flex-col items-start'>
                <p className='py-2 px-4 border border-blue-600 rounded-full text-blue-600 inline-block mb-4 md:mb-6'>Contact</p>
                <h1 className='text-start text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6'>Got a problem to solve?</h1>
                <p className='text-start text-base md:text-lg lg:text-xl mb-4'>
                    Get your space suit ready and tell us your ideas to develop <span className='font-semibold'>your dream web solution.</span>
                </p>
            </div>
            <div className='text-start pl-0 md:pl-10 xl:pl-20 mb-10'>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Name'
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 outline-none rounded-md shadow-sm ring-2 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 outline-none rounded-md shadow-sm ring-2 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder='Message'
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 outline-none rounded-md shadow-sm ring-2 focus:ring-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-5">
                        <a href="" className='flex items-center text-sm  md:text-md lg:text-lg mt-5 md:mt-0'>
                            <MdOutlineMailOutline className='mr-2 text-xl  md:text-2xl' />CodeVibes24@gmail.com
                        </a>
                        <button
                            type="submit"
                            className=" mt-5 md:mt-0 w-full md:w-1/3 border text-nowrap border-blue-600 text-blue-600 py-3 px-4 hover:bg-blue-600 hover:text-white transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'HIRE US'}
                        </button>
                    </div>
                </form>
            </div>
        </div>



        {/* footer */}
        <div className="flex flex-col items-center bg-[#0f1120] text-white p-10 md:p-28 pb-10">
    <div className="flex flex-col md:flex-row justify-between items-start w-full">
        <div className="text-center md:text-start mb-5 md:mb-0">
            <img src="https://i.imgur.com/iMNP1T1.png" alt="" className="w-[100px] md:w-[120px]" />
        </div>
        <div className="text-center mb-5 md:mb-0">
            <h1 className="text-xl md:text-2xl font-semibold">Quick Links</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mt-3 md:mt-5">
                <a href="#" className="my-2 md:mx-10 text-base md:text-xl">Home</a>
                <a href="#" className="my-2 md:mx-10 text-base md:text-xl">About</a>
                <a href="#" className="my-2 md:mx-10 text-base md:text-xl">Contact</a>
            </div>
        </div>
        <div className="text-center md:text-start">
            <h1 className="text-2xl md:text-3xl font-bold">Subscribe To Our Social Media</h1>
            <p className="text-sm md:text-base mt-2 md:mt-0">Contact us for tailored solutions that suit your business.</p>
            <div className="flex justify-center md:justify-start items-center text-2xl md:text-3xl mt-5 space-x-3">
                <FaInstagram />
                <FaFacebookSquare />
                <FaLinkedin />
                <BsTwitterX />
            </div>
        </div>
    </div>
    <div className="text-center mt-10 md:mt-20">
        <p className="text-sm md:text-base">© 2024 CodeVibes, Inc. Privacy . Terms</p>
    </div>
</div>



    </div>
  )
}
