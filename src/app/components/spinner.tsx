import { Spinner as NextSpinner } from "@nextui-org/react"

const Spinner = () => {
     return (
          <div
               style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
               }}
          >
               <NextSpinner />
          </div>
     )
}

export default Spinner