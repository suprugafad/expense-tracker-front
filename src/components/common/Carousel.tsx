import React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Button, Typography } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Gain total control of your money',
    description: 'Become your own money manager and make every cent count',
    imgPath: 'images/onboarding-hand.png',
  },
  {
    label: 'Know where your money goes',
    description: 'Track your transaction easily, with categories and financial report',
    imgPath: 'images/onboarding-paper.png',
  },
  {
    label: 'Planning ahead',
    description: 'Setup your budget for each category so you in control',
    imgPath: 'images/onboarding-plan.png',
  },
];

const Carousel: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {tutorialSteps.map((step, index) => (
          <Box key={step.label} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            width: '100%',
          }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                src={step.imgPath}
                alt={step.label}
                sx={{
                  display: 'block',
                  maxWidth: 300,
                  overflow: 'hidden',
                  width: '100%',
                }}
              />
            ) : null}
            <Typography variant="h4" component="h1" gutterBottom sx={{
              fontWeight: 'bold',
              textAlign: 'center', 
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              hyphens: 'auto',
            }}>{step.label}</Typography>
            <Typography variant="subtitle1" component="p" gutterBottom sx={{
                textAlign: 'center', 
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                color: 'gray'
              }}>{step.description} </Typography>
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Carousel;
