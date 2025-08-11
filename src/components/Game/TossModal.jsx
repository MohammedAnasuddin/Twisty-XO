import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState, useContext, useEffect } from 'react'
import TossWheel from './TossWheel.jsx'
import { GameContext } from '../context/GameContext.jsx'
export default function TossModal() {

const {gameSetup, updateGameSetup} = useContext(GameContext)

const playerOne = gameSetup.players[0].name
const playerTwo = gameSetup.players[1].name
const prize = Math.floor(Math.random() * 8);


  return (
    <>
      
      <Dialog open={true} onClose={() => {null}} className="relative z-50">
        <DialogBackdrop className="w-screen h-screen fixed inset-0  bg-gray-700/10" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Who will go first</DialogTitle>
            <TossWheel playerOne={playerOne} playerTwo={playerTwo} prize={prize} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}