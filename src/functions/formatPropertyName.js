
export const formatPropertyName = (name, sliceLength = 8) => {
    const phaseIndex = name.indexOf('Phase');
    if (phaseIndex !== -1) {
      return `${name.substring(0, sliceLength)}... ${name.substring(phaseIndex)}`;
    }
    return name;
  };
  