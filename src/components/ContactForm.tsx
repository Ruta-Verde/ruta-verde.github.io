import React, { useState } from 'react';
import '../styles/contactForm.css';
import { Box, Button, FormControl, FormLabel, FormHelperText, Input, Textarea, Heading } from '@chakra-ui/react';

function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    // handle form submission logic
  };

  return (
    <Box id="contact" py={10}>
      <form> {/* Use formik? */}
        <FormControl>
          <FormLabel>Contact Us!</FormLabel>
          <Input type='email' placeholder='Email' />
          <FormHelperText>Stay up to date with our upcoming events!</FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
};

export default ContactForm;
