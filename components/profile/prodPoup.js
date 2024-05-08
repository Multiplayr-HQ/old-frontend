



const prodPoup = ()=>{


    return(
    <>
    
    <div id="prod1" className="quick_view" style={{display:'none'}}>
      <div className="product_box">
        <div className="product-img-box">
          <div className="prod_big_thumb">
            <div className="slider-for">
              <div>
                <div className="slide-box"> <img  src="/assets/media/team/product1.jpg"  alt=""/> </div>
              </div>
              <div>
                <div className="slide-box"> <img   src="/assets/media/team/product1.jpg"  alt=""/> </div>
              </div>
              <div>
                <div className="slide-box"> <img   src="/assets/media/team/product1.jpg"  alt=""/> </div>
              </div>
              <div>
                <div className="slide-box"> <img   src="/assets/media/team/product1.jpg"  alt=""/> </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-detail-box">
          <h1>Red Oceacon</h1>
          <div className="row">
            <div className="col-lg-12">
              <div className="like_view"> <a href="#" className="art"><i className="fa fa-picture-o" aria-hidden="true"></i> Art</a> <a href="#" className="view"><i className="fa fa-eye" aria-hidden="true"></i> 250</a> <a href="#" className="like"><i className="fa fa-heart" aria-hidden="true"></i> 18</a> </div>
              <div className="review"> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <span className="rev_txt">Based on <b>2 reviews</b></span> </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="price"> $48.00 <del style={{display: 'none'}}>£299.00</del> <span className="discount" style={{display: 'none'}}>(10% Discount)</span> </div>
              <p className="brief">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique purus vitae venenatis ultrices. Suspendisse tristique  tortor ante, </p>
            </div>
          </div>
          <div className="row size-option">
            <div className="col-lg-12">
              <ul>
                <li> <a href="#!">Choose Size</a>
                  <div className="content size-chart mCustomScrollbar">
                    <ul>
                      <li>36 x 5 inches<span>Out of  Stock</span></li>
                      <li className="selected">32 x 5 inches <span>Last 1 left</span></li>
                      <li>36 x 4 inches</li>
                      <li>26 x 1 inches</li>
                    </ul>
                  </div>
                </li>
                <li> <a href="#!">Qty</a>
                  <div className="content size-chart qty mCustomScrollbar">
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li className="selected">3</li>
                      <li>4</li>
                      <li>5</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="row cart-row">
            <div className="col-lg-12 col-md-12 col-xs-12"> <a href="#!" className="btn btn-primary"><i className="fa fa-shopping-basket"></i> Add To Bag </a> <a href="#!" className="btn btn-primary"><i className="fa fa-heart-o" aria-hidden="true"></i> Add To wishlist </a> </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
    
    
    )
    }
    
    export default prodPoup;