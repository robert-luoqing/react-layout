```
 const newRootData: DivContainerModel = {
      id: uuidv4(),
      type: "DivContainer",
      width: 1200,
      height: 800,
      border: "1px solid gray",
      padding: "16px",
      children: [
        {
          id: uuidv4(),
          type: "DivContainer",
          width: null,
          height: 100,
          position: "static",
          left: 50,
          top: 50,
          border: "1px solid green",

          children: [],
        },
        {
          id: uuidv4(),
          type: "DivContainer",
          width: 400,
          height: 400,
          position: "static",
          left: 250,
          top: 250,
          border: "1px solid blue",
          children: [],
        },
        {
          id: uuidv4(),
          type: "Label",
          position: "static",
          border: "1px solid blue",
          text: "My Test Text",
          display: "inline-block",
          children: [],
        },
        {
          id: uuidv4(),
          type: "Label",
          position: "absolute",
          border: "1px solid blue",
          left: 787,
          top: 240,
          text: "My Test Text2",
          fontSize: 24,
          fontWeight: "800",
          display: "inline-block",
          children: [],
        },
        {
          id: uuidv4(),
          type: "DivContainer",
          width: 200,
          height: 100,
          position: "absolute",
          left: 450,
          top: 350,
          border: "1px solid green",

          children: [],
        },
        {
          id: uuidv4(),
          type: "DivContainer",
          width: 200,
          height: 100,
          position: "absolute",
          left: 650,
          top: 550,
          border: "1px solid green",

          children: [],
        },
      ],
    };
```

```
{"id":"b759fbda-a962-4321-8dd2-849acea18907","type":"DivContainer","width":1200,"height":800,"border":"1px solid gray","padding":"16px","children":[{"id":"53e3def1-0eda-475e-aafa-55ba557103c1","type":"DivContainer","width":"","height":87,"position":"static","children":[{"id":"0a1f8cc3-55ba-4b5f-9463-636e4cc3f712","type":"Label","position":"absolute","text":"UserName: ","display":"inline-block","children":[],"left":143,"top":33},{"id":"7e3f85ce-0d1b-4bec-bf91-02ffc99e1ff7","type":"Input","position":"absolute","text":"{user.name}","display":"inline-block","children":[],"left":237,"top":30},{"id":"03a86170-953e-405e-987a-a830a301aada","type":"Label","position":"absolute","text":"This is {user.name}","display":"inline-block","children":[],"left":457,"top":33},{"id":"f36bf204-5ee0-4158-9539-b8ff8facfdb2","type":"Label","position":"absolute","text":"This is {base.userName}","display":"inline-block","children":[],"left":932,"top":31,"width":"","height":27},{"id":"2d9ecf95-21b2-4e02-9d4b-ac009c6900ec","type":"Input","position":"absolute","text":"{base.userName}","display":"inline-block","children":[],"left":698,"top":33}],"left":272,"top":107,"forPath":"users","forItemName":"user"}]}
```