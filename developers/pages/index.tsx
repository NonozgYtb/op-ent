import {
  Box,
  Group,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Paper,
  PaperProps,
  Button,
  Anchor,
  Container,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Head from "next/head";
import Link from "next/link";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function (props: PaperProps<"div">) {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size="xl" px="md" mt="xl">
        <Group direction="row" grow>
          <Box>
            <Title order={1}>DEVELOPER PORTAL</Title>
            <Text>Create and manage app accesses to open-dw.</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              laudantium necessitatibus, aut corporis voluptas magni vitae
              quibusdam earum tempore. Vero optio illo commodi ab ratione
              delectus atque veritatis, esse accusantium pariatur itaque
              obcaecati quibusdam dolore ea cum? Quas vel eaque, beatae,
              mollitia sequi ipsum iure voluptatum repellendus molestias omnis
              a?
            </Text>
          </Box>
          <Paper radius="md" p="xl" withBorder {...props}>
            <Title order={2} mb="lg">
              LOGIN
            </Title>
            <form onSubmit={form.onSubmit(() => {})}>
              <Group direction="column" grow>
                <TextInput
                  id="email"
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                />
                <PasswordInput
                  id="password"
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                />
              </Group>
              <Group position="apart" mt="xl">
                <Link href="#" passHref>
                  <Anchor component="a" color="gray" size="xs">
                    Don't have an account? Register
                  </Anchor>
                </Link>
                <Button type="submit" uppercase>
                  Login
                </Button>
              </Group>
            </form>
          </Paper>
        </Group>
      </Container>
    </>
  );
}
