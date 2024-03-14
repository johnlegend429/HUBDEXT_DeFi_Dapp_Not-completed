import React from 'react'
import "./styles.css"

function stepKYC() {
  return (
    <section className='stepKYC'>
                <div className='row text-center'>
                    <div className='col-sm-4'>
                        <img src="/assets/images/icons/people.svg" alt="" />
                        <h4 className='title'>Buy DEXT</h4> 
                        <p className='kytext'>The first step to join us. Get it on Dextools.io or uniswap.</p>
                    </div>
                    <div className='col-sm-4'>
                        <img src="/assets/images/icons/wallet.svg" alt="" />
                        <h4 className='title'>Connect wallet</h4> 
                        <p className='kytext'>Once you have your DEXTs, connect your wallet.</p>
                    </div>
                    <div className='col-sm-4'>
                         <img src="/assets/images/icons/verify.svg" alt="" />
                        <h4 className='title'>Enjoy ecosystem</h4> 
                        <p className='kytext'>Now is the time to start enjoying all the services.</p>
                    </div>
                </div>
    </section>
    

  )
}

export default stepKYC