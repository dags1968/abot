{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
  ];
  env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid]; };
}