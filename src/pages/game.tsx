import Head from 'next/head'
import { Canvas } from '@react-three/fiber'
import Scene from '@/compnents/Game/Scene/Scene'

export default function Home() {
  return (
    <>
      <Head>
        <title>run fast as you can !!!</title>
        <meta name="description" content="game page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Canvas
        shadows
        camera={{ position: [0,15,-20] }}
      >
        <Scene/>
      </Canvas>
    </>
  )
}
