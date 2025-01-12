import querystring from "qs";

export const qs = {
  stringify: querystring.stringify,
  parse: (data: string | Record<string, string>) =>
    querystring.parse(data, {
      // @ts-expect-error: Ignoring unused variable warning
      decoder(value, decoder, charset) {
        const keywords = {
          true: true,
          false: false,
          null: null,
          undefined: undefined,
        };
        if (value in keywords) {
          return keywords[value as keyof typeof keywords];
        }

        const strWithoutPlus = value.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          console.error(e);
          return strWithoutPlus;
        }
      },
    }),
};

export const getSearchParams = <T>() => {
  return qs.parse(window.location.search.substr(1)) as T;
};
