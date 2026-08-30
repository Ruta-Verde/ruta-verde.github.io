import { useLayoutEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

function PrivacyPolicy() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <Box w='100%'>
      <Box py={16} maxW="90vw" mx="auto">
        <VStack spacing={8} align="stretch" maxW="800px" mx="auto">
          <Heading as="h1" size="2xl">
            Privacy Policy
          </Heading>
          <Text color="gray.500">
            Last updated: August 30, 2026
          </Text>

          <Text color="gray.600">
            This policy describes what information Ruta Verde collects
            through this website (rutaverde.org / ruta-verde.github.io) and
            how it is used. This page is not yet linked from the site
            navigation and has not been reviewed by legal counsel.
          </Text>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Information We Collect
            </Heading>
            <Text color="gray.600" mb={2}>
              We collect information in the following ways:
            </Text>
            <UnorderedList color="gray.600" spacing={1} pl={4}>
              <ListItem>
                <b>Account sign-in:</b> When you sign in with Google, our
                authentication provider (Supabase Auth) receives your Google
                account's name and email address to create and identify your
                account. We store a username and account creation date
                associated with your profile.
              </ListItem>
              <ListItem>
                <b>Newsletter signup:</b> If you submit the newsletter form in
                the site footer, we collect and store the name and email
                address you provide.
              </ListItem>
              <ListItem>
                <b>Event participation:</b> If you sign up for or help run an
                event, we store your association with that event and your
                role (e.g. volunteer, event organizer).
              </ListItem>
              <ListItem>
                <b>Volunteer activity:</b> For events you participate in, we
                may record volunteer hours, trees planted, and related notes,
                which may be verified by an event organizer or admin.
              </ListItem>
              <ListItem>
                <b>Content you or admins upload:</b> Blog posts, blog cover
                images/PDFs, and event cover images uploaded through the site
                are stored in our file storage.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              How We Use Your Information
            </Heading>
            <Text color="gray.600">
              We use the information above to operate your account, let you
              sign up for and participate in events, track and recognize
              volunteer contributions, publish blog content, and send
              newsletter communications to people who sign up for them. We do
              not sell your information, and we do not currently use
              advertising or analytics tracking on this site.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Third-Party Services
            </Heading>
            <Text color="gray.600" mb={2}>
              We rely on the following third-party services to run this
              site:
            </Text>
            <UnorderedList color="gray.600" spacing={1} pl={4}>
              <ListItem>
                <b>Google Sign-In:</b> used to authenticate your identity.
                Google's handling of your data is governed by Google's own
                privacy policy.
              </ListItem>
              <ListItem>
                <b>Supabase:</b> our backend provider, used for
                authentication, database storage, and file storage. Data you
                provide through this site is stored on Supabase's
                infrastructure.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Cookies & Tracking
            </Heading>
            <Text color="gray.600">
              This site does not use advertising cookies or analytics
              trackers. Signing in stores a session token in your browser's
              local storage so you can stay signed in; this token is only
              used for authentication and is not used for tracking across
              other sites.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Data Retention & Security
            </Heading>
            <Text color="gray.600">
              We retain account, event, and volunteer records for as long as
              your account is active or as needed to maintain accurate
              volunteer and organizational records. Access to administrative
              data is restricted by role (e.g. only admins can access certain
              records). If you would like your data deleted, contact us using
              the information below.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Your Rights
            </Heading>
            <Text color="gray.600">
              You may request access to, correction of, or deletion of your
              personal information by contacting us. You may also unsubscribe
              from newsletter emails at any time by contacting us directly.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={2}>
              Contact Us
            </Heading>
            <Text color="gray.600">
              Questions about this policy or your data can be sent to{' '}
              <b>info@rutaverde.org</b> or by phone at <b>425-577-3312</b>.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default PrivacyPolicy;
