import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
SwiperCore.use(Navigation, Pagination, Scrollbar, A11y)
const Listing = () => {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        
         fetchListing()
         //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, params.listingId])

    if(loading ){
        <Spinner />
    }

  return (
    <main>
       {listing ? <> 
      
                <Swiper slidesPerView={1} pagination={{clickable: true}}>
                        {listing.imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <img src={listing.imageUrls[index]} style={{ backgroundImage: `url(${listing.imageUrls[index]}) center no-repeat`}}
                                className='swiperSlideDiv' alt="food" />
                              
                            </SwiperSlide>
                        ))}
                </Swiper> 
  
          

            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 4000)
            }}>
            
            <img src={shareIcon} alt="share" />
            </div>
            {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}


               <div className="listingDetails">
                    <p className="listingName">
                    {listing.name} - Kshs {listing.offer ? listing.discountedPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  : listing.regularPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                    </p> 
                    <p className="listingLocation">{listing.location}</p>
                <p className="listingType">For {listing.type === 'rent' ? ' Rent' : 'Sale'}</p>
                    {listing.offer && (
                        <p className='discountPrice'>${(listing.regularPrice - listing.discountedPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") } discount</p>
                    )}

                    <ul className='listingDetailsList'>
                        <li>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                        </li>
                        <li>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                        </li>
                        <li>{listing.parking && 'Parking Spot'}</li>
                        <li>{listing.furnished && 'Furnished'}</li>
                    </ul>

                    {<p className="listingLocationTitle">Location</p>}
                    
                    
                    <div className="leafletContainer">
                        <MapContainer style={{height: '100%', width: '100%'}} center={[listing.geoLocation.lat, listing.geoLocation.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                        />
                        <Marker position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                        </MapContainer>
                    </div>



                    {auth.currentUser?.uid !==  listing.userRef && (
                        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">Contact Landlord</Link>
                    )}
                 </div> 
                 </> : <Spinner />
            }
    </main> 
  )
}

export default Listing