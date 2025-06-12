import React from 'react'

const Footer = () => {
  return (
    
<footer className="bg-black text-white py-10 px-6">
<hr className="my-6 border-gray-700" />
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
    
    <div className='w-24 sm:w-32 md:w-40 lg:w-60 mx-auto md:mx-0 s'>
      <img className='w-full' src="/logo.png" alt="" />
    </div>
    <div>
        <h2 className="text-xl font-bold mb-3">Habot Learning</h2>
        <p className="text-gray-400">
          Empowering children with the best learning resources. Curated videos, articles, and more to explore.
        </p>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-3">Quick Links</h2>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-white transition">Home</a></li>
        <li><a href="#" className="hover:text-white transition">Courses</a></li>
        <li><a href="#" className="hover:text-white transition">About</a></li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-3">Follow Us</h2>
      <div className="flex justify-center md:justify-start gap-4">
        <a href="#" className="hover:text-blue-400 transition">Facebook</a>
        <a href="#" className="hover:text-pink-400 transition">Instagram</a>
        <a href="#" className="hover:text-sky-400 transition">Twitter</a>
      </div>
    </div>
  </div>

</footer>

  )
}

export default Footer
