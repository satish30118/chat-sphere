import Input from "../atoms/Input";
import Button from "../atoms/Button";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import SignInForm from "../molecules/auth/SignInForm";
import SignupForm from "../molecules/auth/SignupForm";

const AuthForm = ({ isSignIn, toggleForm }) => {
  return (
    <Container maxW="md" centerContent>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="2px">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignInForm />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthForm;
