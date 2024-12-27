import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2024 Dynamic JSON Processing API. All rights reserved.</p>
        <div className="flex gap-2 justify-center items-center mt-2">
          <div className="w-fit rounded-full bg-slate-500 p-1 items-center">
            <GithubIcon size={16}/>
            </div>
          
          <p>
          Contribute on <Link href="https://github.com/RitabrataPatra/tojsonapi" target="_blank" rel="noopener noreferrer" className="text-green-500 underline">GitHub</Link>.
        </p>
        </div>
        
      </footer>
  )
}

export default Footer