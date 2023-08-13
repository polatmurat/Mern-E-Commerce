const state = {
    "product": {
        "_id": "64d8c129fca63e8bada520dc",
        "title": "That's the point!",
        "price": 1000,
        "discount": 11,
        "category": "no pain yes gain",
        "stock": 77,
        "colors": [
            {
                "color": "#0693e3",
                "id": "f316ec00-f0c7-41cc-8aa0-a6fc61b67162"
            },
            {
                "color": "#8ed1fc",
                "id": "04a438cc-e1da-46a9-a4b6-8cf126929264"
            },
            {
                "color": "#abb8c3",
                "id": "2f19c8fb-f9a0-4852-809f-524bdb2d61ec"
            },
            {
                "color": "#7bdcb5",
                "id": "9f12e886-7063-4789-9d89-8860ba6677a8"
            },
            {
                "color": "#fcb900",
                "id": "377adf54-feb7-44dc-89f9-a949613cd048"
            },
            {
                "color": "#ff6900",
                "id": "da49678b-e769-4ecf-8ca2-98f2b89b2581"
            },
            {
                "color": "#f78da7",
                "id": "33249273-2aaa-4e4d-9747-f5c3b2ff636b"
            },
            {
                "color": "#eb144c",
                "id": "7573cdb3-c6f3-4360-8c3a-a5c5a9490663"
            }
        ],
        "sizes": [
            {
                "name": "1 years"
            },
            {
                "name": "xl"
            }
        ],
        "description": "<p>Dsc</p>",
        "image1": "d5590e32-1736-4c08-9626-83a16ff67fa1.png",
        "image2": "0d40df87-e9b3-4c4c-819f-0650d61534c0.png",
        "image3": "ae1155a4-fbf6-4977-a5b2-9c64177b8fd3.png",
        "createdAt": "2023-08-13T11:40:25.364Z",
        "updatedAt": "2023-08-13T11:40:25.364Z"
    }
}

state.product.createdAt = new Date();

console.log(state.product.createdAt);