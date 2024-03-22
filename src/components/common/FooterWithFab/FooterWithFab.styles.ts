export const FooterWithFabStyles = {
  footerBox: { 
    position: 'fixed', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    textAlign: 'center',
    backgroundColor: 'rgba(211, 211, 211, 0.7)',
    width: '100%',
    height: '10vh',
    paddingTop: '1.5vh',
    borderTopLeftRadius: '25px', 
    borderTopRightRadius: '25px',
  },

  fabsBox: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
  },

  fab: {
    backgroundColor: 'white',
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