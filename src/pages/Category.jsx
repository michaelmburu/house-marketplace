import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Category = () => {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get refrence
        const listingRef = collection(db, 'listings')

        //Create Query
        const q = query(listingRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(5))

        //Execute query
        const querySnapshot = await getDocs(q)

        // Get the last item
        const lastVisible  = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastFetchedListing(lastVisible)

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
        toast.error("Unable to fetch listings")
      }
    }

    fetchListings()
  }, [params.categoryName])


  // Pagination // Load more
  const onfetchMoreListings = async () => {
    try {
      //Get refrence
      const listingRef = collection(db, 'listings')

      //Create Query
      const q = query(listingRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing), limit(10))

      //Execute query
      const querySnapshot = await getDocs(q)

      // Get the last item
      const lastVisible  = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Unable to load more listings")
    }
  }

  return (
    <div className='category'>    
      {loading ? (<Spinner /> ) : listings && listings.length > 0 ? (
      <>
        <main>
          <header>
            <p className="pageHeader">
              {params.categoryName === 'rent' ? 'Places For Rent' : 'Places For Sale'}
            </p>
          </header>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul> 
        </main>
        <br />
        <br />

        {lastFetchedListing && (
          <p className="loadMore" onClick={onfetchMoreListings}>Load More</p>
        )}
      </>) : (<p>No listings for {params.categoryName}</p>)}
      
    </div>
  )
}

export default Category