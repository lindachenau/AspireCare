import React from "react"
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact"
// import Img from 'gatsby-image'

const CarouselPage = ({imgList}) => {
  return (
    <MDBCarousel activeItem={1} length={4} className="z-depth-1 w-100">
      <MDBCarouselInner>
        {imgList.map(item => 
          <MDBCarouselItem itemId={item.key} key={item.key}>
            <MDBView>
              {/* <Img className="d-block w-100" fluid={item.image.fluid} alt={item.title} /> */}
              <img className="d-block w-100" src={item.image.fluid.src} alt={item.title} />
              <MDBMask overlay="white-light" />
            </MDBView>
          </MDBCarouselItem>
        )}
      </MDBCarouselInner>
    </MDBCarousel>
  )
}

export default CarouselPage
