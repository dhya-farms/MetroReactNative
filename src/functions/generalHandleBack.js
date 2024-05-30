export const handleBack = (backscreen, navigation) => {
    if (backscreen==="Home") {
      navigation.navigate("Home");
    
    } else if(backscreen==="Properties"){
      navigation.navigate("properties", {
        screen: "Customer Properties",
      });
    } else if(backscreen==="Favorites"){
      navigation.navigate("Favorites");
    } else {
      navigation.goBack();
    }
  };