import { collection, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Category = () => {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get refrence
        const listingRef = collection(db, 'listings')

        //Create Query
        const q = query(listingRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10))

        //Execute query
        const querySnapshot = await getDocs(q)

        const listings = []

        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error("Unable to fetch listings")
      }
    }

    fetchListings()
  }, [params.categoryName])
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places For Rent' : 'Places For Sale'}
        </p>
      </header>
      {loading ? (<Spinner /> ) : listings && listings.length > 0 ? (<>
        <ul className="categoryListings">
          {listings.map((listing) => (
            <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
          ))}
        </ul>
      
      </>) : (<p>No listings for {params.categoryName}</p>)}
    </div>
  )
}

export default Category