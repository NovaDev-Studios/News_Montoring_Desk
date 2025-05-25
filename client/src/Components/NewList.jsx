import React, { useState, useEffect } from 'react';
import { fetchNews } from '../Services/api.js'

const NewList = () => {

  useEffect(() => {
    fetchNews()
  }, [])


  return (
    <div><h1>sddfghjk</h1></div>
  )
}

export default NewList