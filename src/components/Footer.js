import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css'
import React from 'react';

function CustomFooter() { // basic footer component

    return (
        <div className="main-footer">
            <div className="container">
                <div class="row">
                    <div class="col-sm-3">

                    </div>
                    <div class="col">
                        <div class="container">
                            <a style={{ textDecoration: "none", cursor: "pointer" }}>©2019 Market</a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="container">
                            •
                        </div>
                    </div>
                    <div class="col">
                        <div class="container">
                            <a style={{ textDecoration: "none", cursor: "pointer" }}>Privacy Policy</a>
                        </div>
                    </div>
                    <div class="col-sm-3">

                    </div>
                </div>
            </div>
        </div>


    )
}

export default CustomFooter;