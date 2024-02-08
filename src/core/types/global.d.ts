
export {};



declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type accessibleFunctions = {
    switchPage: Function;
  };
   

  enum Target {
    ENEMY = "enemy",
    HERO = "hero"
}


  
}



