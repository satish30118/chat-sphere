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

const AuthForm = () => {
  return (
    <Container maxW="lg" centerContent>
      <Box
        bg="white"
        w="100%"
        p={7}
        borderWidth="2px"
        borderColor="gray"
      >
        <Tabs isFitted isLazy >
          <TabList mb="1em">
            <Tab >Sign In</Tab>
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
