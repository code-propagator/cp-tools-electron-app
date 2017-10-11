import React from 'react'

import ClickCount from 'cp-tools/libcptools/react/ClickCount'

const Home = () => (
  <div>
    <h2>React Home</h2>
    <ClickCount count={666} /><br />
    <ClickCount /><br />
  </div>
)

export default Home
