import React, { useContext } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Confirm from './Confirm'
import Success from './Success'
import { AppContext } from './Context'
import "./styles.css"


// Step titles
const labels = ['First Step', 'Second Step', 'Third Step' , 'Review and apply']
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <FirstStep />
    case 1:
      return <SecondStep />
    case 2:
      return <ThirdStep />
    case 3:
      return <Confirm/>  
    default:
      throw new Error('Unknown step')
  }
}

const StepForm = () => {
  const { activeStep } = useContext(AppContext)

  return (
    <>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <>
            <div className='navigation-zone desktop'>
                <h5>If you want to launch an ILO/IDO, it will be your perfect choice</h5>
                    <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel orientation='vertical'>
                        {labels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                <img src="/assets/images/bg/rocket.png" className="rocketBounce apply" alt="rocket"></img>
            </div>
            <div className='navigation-zone mobile'>
                <h5>If you want to launch an ILO/IDO, it will be your perfect choice</h5>
                    <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
                        {labels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                <img src="/assets/images/bg/rocket.png" className="rocketBounce apply" alt="rocket"></img>
            </div>
            <div className='step-zone'>  
                {handleSteps(activeStep)}
            </div>       
        </>
      )}
    </>
  )
}

export default StepForm
