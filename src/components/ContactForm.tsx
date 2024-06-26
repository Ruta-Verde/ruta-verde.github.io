import React, { useState } from 'react';
import '../styles/contactForm.css';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react';

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
      <Heading as="h2" size="xl" mb={6}>
        Contact Us
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Name" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email" required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Message</FormLabel>
          <Textarea name="message" value={formState.message} onChange={handleChange} placeholder="Message" required />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
