import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/josefin-sans' // Supports weights 100-700F 

const theme = extendTheme({
    fonts: {
       josefinSans: `'Josefin Sans Variable', sans-serif`,
    },
})

export default theme