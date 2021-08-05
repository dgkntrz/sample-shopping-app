import 'bootstrap/dist/css/bootstrap.css';
import './Header.css'
import React from 'react';
import ShoppingCart from './ShoppingCart';

function CustomHeader() {

    return (
        <div className="main-header">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">

                    </div>
                    <div class="col-sm-1" >
                        <div className="textstyle">
                            market
                        </div>
                    </div>
                    <div class="col">

                    </div>
                    <div class="col">
                        <ShoppingCart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomHeader;