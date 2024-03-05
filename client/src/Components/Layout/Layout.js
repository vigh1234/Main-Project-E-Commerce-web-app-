import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet'

function Layout({children,title,descriptin,keyword,author}) {
  return (
    <div>
      <Helmet>
          <meta charSet='utf-8'/>
          <meta name='description' content={descriptin}/>
          <meta name='keyword' content={keyword}/>
          <meta name='author' content={author}/>
          <title>{title}</title>
      </Helmet>
        <Header/>
        <main style={{minHeight:'80vh'}}>
        {children}
        </main>
        <Footer/>
        
    </div>
  )
}
Layout.defaultProps={
  title:"Ecommerce App",
  descriptin:"Mern Stack Project",
  keyword:"Ecommerce,mern,react,website,mongodb",
  author:"author"
}

export default Layout
