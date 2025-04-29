const regex = /\/[0-9]{8}-[0-9]{4}-[0-9]{4}/;

if (regex.test(document.location.pathname)) {
    // @ts-ignore
    import("./*.ts");
    // @ts-ignore
    import("./**/index.ts");
};
