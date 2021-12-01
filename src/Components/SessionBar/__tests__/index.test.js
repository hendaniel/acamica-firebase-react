import { render, screen } from "@testing-library/react";
import { SessionBar } from "..";

const userMock = {
  photoURL: "https://www.google.com",
  displayName: "Maxi",
};

jest.mock("../../../firebase", () => {
  return { getCurrentUser: () => userMock };
});

describe("<SessionBar/>", () => {
  let result;
  beforeEach(() => {
    result = render(<SessionBar />);
  });
  afterEach(() => {
    jest.resetModules();
  });
  test("Se muestra el nombre del usuario", async () => {
    const nombre = await result.findByText("¡Hola Maxi!");
    expect(nombre).toBeInTheDocument();
  });

  test("Se muestra la foto del usuario", async () => {
    const img = await result.findByTestId("imagen");
    expect(img).toBeInTheDocument();
  });

  test("Se muestra el boton de login si no hay usuario", async () => {
    //FIXME: Mock reset no esta funcionando
    jest.mock("../../../firebase", () => {
      return { getCurrentUser: () => null };
    });

    render(<SessionBar />);
    const btnLogin = await screen.findByText("Login con google");
    expect(btnLogin).toBeInTheDocument();
  });
});
