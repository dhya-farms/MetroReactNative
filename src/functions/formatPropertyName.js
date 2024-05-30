
export const formatPropertyName = (name) => {
    const phaseIndex = name.indexOf('Phase');
    if (phaseIndex !== -1) {
      return `${name.substring(0, 8)}... ${name.substring(phaseIndex)}`;
    }
    return name;
  };
  