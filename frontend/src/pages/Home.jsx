import React, { useState } from 'react'
import Header from '../components/Header'
import Exploremenu from '../components/Exploremenu'
import FoodDisplay from '../components/FoodDisplay'
import Footer from '../components/footer'

const Home = () => {

  const[category , setCategory] = useState("All")

  return (
  <div>

<Header />
<Exploremenu category={category} setCategory={setCategory} />
<FoodDisplay  category={category} setCategory={setCategory} />
<Footer />

  </div>

  )
}

export default Home