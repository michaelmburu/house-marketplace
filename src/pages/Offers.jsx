import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Offers = () => {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListings, setLastFetchedListings] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get refrence
        const listingRef = collection(db, 'listings')

        //Create Query
        const q = query(listingRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(1))

        //Execute query
        const querySnapshot = await getDocs(q)

         // Get the last item
         const lastVisible  = querySnapshot.docs[querySnapshot.docs.length - 1]
         setLastFetchedListings(lastVisible)

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
  }, [])



  // Pagination // Load more
  const onfetchMoreListings = async () => {
    try {
      //Get refrence
      const listingRef = collection(db, 'listings')

      //Create Query
      const q = query(listingRef, where('offer', '==', true), orderBy('timestamp', 'desc'), startAfter(lastFetchedListings), limit(10))

      //Execute query
      const querySnapshot = await getDocs(q)

      // Get the last item
      const lastVisible  = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastFetchedListings(lastVisible)

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
      console.log(error)
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
              Offers
            </p>
        </header>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
            ))}
          </ul>
        </main>

        {lastFetchedListings && (
          <p className="loadMore" onClick={onfetchMoreListings}>Load More</p>
        )}
      </>) : (<p>There are no current offers</p>)}
    </div>
  )
}

export default Offers