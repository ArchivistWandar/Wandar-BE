Wander BackEnd

가보자구!

[x] express server 

[x] AWS bucket (****)
    S3 관련 upload, delete, 폴더 prameter 추가 (share util)
    create post에서 import

[ ] hashtag (* photo 전에 먼저)
    post caption 내의 hashtag 프로세싱 (post util)
    create post에서 import, connectorcreate hashtag

* SEQUENCE

[] see hashtag
[] upload photo
[] create post
[] see photo
[] see post
[] delete photo
[] edit post
[] delete post


* ISSUES

[?] post layout collage
    콜라주 생성 API 호출 (이건 아마 react native 쪽에서 처리할 듯)https://cloudinary.com/documentation/image_collage_generation
    콜라주를 DB에 post 모델의 속성 형태로 저장하는 방법..?
    
[?] land shape/theme
    layout/shape/theme 전부 각각 모델에 따로 속성을 만들어줘야하는지?
    심지어 랜드쉐입은 3djs도 건드려야할 것 같은데 백엔드에서는 대충 스트링으로 처리하고 실제 쉐입은 프론트엔드에서 건드리는건가?

[?] kakomap API 호출
    실제 지도기반 검색 기능 활용 - location
    share util에 위치 검색 함수 작성 (선명아 도와줘!)

[?] edit location
    photo/post 내의 photo/land에서 update 외에 location edit mutation이 별도로 필요한가?
    post, land update에서 아모르파티다씨잉 난 감자야 엉엉

[!] post edit
    instaclone editphoto resolver는 사진 자체를 수정하는 기능이 x 캡션만 수정함. post의 경우 여러 photo의 집합체이므로 edit할때 photo delete/upload가 따로 필요 -> client update로 가능한가?

    editProfile에서 했던 방식으로 만들면 됨 해결~







