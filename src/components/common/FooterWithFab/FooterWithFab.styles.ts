import theme from '../../../theme';

export const FooterWithFabStyles = {
  footerBox: { 
    position: 'fixed', 
    bottom: theme.spacing(2), 
    left: 0, 
    right: 0, 
    textAlign: 'center',
  },

  fabsBox: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
  },

  toggleBox: {
    position: 'fixed',
    top: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    zIndex: 1,
    background: 'linear-gradient(to top, rgba(100, 100, 255, 0.3), transparent)',
  },

  openedFabsBox: { 
    position: 'absolute', 
    top: -80, 
    left: '50%', 
    transform: 'translateX(-50%)', 
    zIndex: 1, 
  },

  fabImage: { 
    width: '100%', 
    height: '100%', 
  },
  
}