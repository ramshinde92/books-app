import authService from "./authService";
import { BASE_URL, AUTH_REQUEST_BODY } from "../constants";

describe("Auth Service", () => {
  it("should set isAuthenticated to false initially", () => {
    expect(authService.isAuthenticated).toEqual(false);
  });

  it("should call fetch with success", done => {
    const mockSuccessResponse = { status_code: 200 };
    const mockFetchPromise = Promise.resolve(mockSuccessResponse);
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    authService.authenticate();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/auth`,
      AUTH_REQUEST_BODY
    );
    process.nextTick(() => {
      expect(global.fetch()).resolves.toEqual({ status_code: 200 });
      global.fetch.mockClear();
      done();
    });
  });

  it("should call fetch with failure", done => {
    const mockFailureResponse = { status_code: 404 };
    const mockFetchPromise = Promise.reject(mockFailureResponse);
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    authService.authenticate();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/auth`,
      AUTH_REQUEST_BODY
    );
    process.nextTick(() => {
      expect(global.fetch()).rejects.toEqual({ status_code: 404 });
      global.fetch.mockClear();
      done();
    });
  });

  it("should call authenticate with success", () => {
    const mockSuccessResponse = { code: "200", status: "Success" };
    const mockFetchPromise = Promise.resolve(mockSuccessResponse);
    jest
      .spyOn(authService, "authenticate")
      .mockImplementation(() => mockFetchPromise);
    authService.authenticate().then(data => {
      expect(data).toEqual(mockSuccessResponse);
    });
  });

  it("should call authenticate with failure", () => {
    const mockFaiureResponse = { status: "404", error: "Not Found" };
    const mockFetchPromise = Promise.reject(mockFaiureResponse);
    jest
      .spyOn(authService, "authenticate")
      .mockImplementation(() => mockFetchPromise);
    authService.authenticate().catch(err => {
      expect(err).toEqual(mockFaiureResponse);
    });
  });

  it("should call subscription with success", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({ access_type: "free" });
          }
        });
      });
    });

    expect.assertions(1);
    const response = await authService.subscription();

    expect(response).toEqual({ access_type: "free" });
    global.fetch.mockClear();
  });

  it("should call subscription with failure", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject();
      });
    });

    expect.assertions(1);
    try {
      await authService.subscription();
    } catch (err) {
      expect(err.message).toEqual("Unable to fetch subscription");
    }
  });

  describe("isAuthenticated Flag", () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, "setItem");
      jest.spyOn(Storage.prototype, "clear");
    });

    afterEach(() => {
      localStorage.setItem.mockRestore();
      localStorage.clear.mockRestore();
    });

    it("should set isAuthenticate to true when setAuthenticated is called", () => {
      authService.setAuthenticated();
      expect(localStorage.setItem).toBeCalledWith("isAuthenticated", true);
      expect(authService.isAuthenticated).toBeTruthy();
    });

    it("should set isAuthenticate to false when unset is called", () => {
      authService.unset();
      expect(localStorage.clear).toHaveBeenCalledTimes(1);
      expect(authService.isAuthenticated).toBeFalsy();
    });

    it("should return isAuthenticate flag", () => {
      expect(authService.get()).toEqual(false);
    });
  });
});
