async function initMocks() {
  if (typeof window === 'undefined') {
    console.log('-----MSW-SERVER----');
    const { server } = await import('./server')
    server.listen()
  } else {
    console.log('-----MSW-BROWSER----');
    const { worker } = await import('./browser')
    worker.start()
  }
}

initMocks()

export {}
