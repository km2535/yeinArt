export default async function kakaoMessage() {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }
  try {
    window.Kakao.API.request({
      url: "/v2/user/scopes",
      data: {
        scopes: ["talk_message"],
      },
    })
      .then(function (response) {
        console.log(response.scopes.length > 0);
        if (response.scopes.length > 0) {
          window.Kakao.API.request({
            url: "/v2/api/talk/memo/default/send",
            data: {
              template_object: {
                object_type: "feed",
                content: {
                  title: "예인아트",
                  description: "여러분과 동행하는 예인아트입니다",
                  image_url:
                    "https://firebasestorage.googleapis.com/v0/b/yein-bc06d.appspot.com/o/kakaoTalk%2Fintro.jpg?alt=media&token=efee15f4-1c69-4f1e-942d-b6fba061ae85",
                  link: {
                    web_url: "http://pf.kakao.com/_IxfPfxj",
                    mobile_web_url: "http://pf.kakao.com/_IxfPfxj",
                  },
                },
                item_content: {
                  profile_text: "예인아트",

                  title_image_url:
                    "https://firebasestorage.googleapis.com/v0/b/yein-bc06d.appspot.com/o/kakaoTalk%2Flogo.jpg?alt=media&token=da54d289-8e03-4f49-b690-b54dba0740e9",
                  title_image_text: "YeinArt",
                },
                buttons: [
                  {
                    title: "채널추가하기",
                    link: {
                      mobile_web_url: "http://pf.kakao.com/_IxfPfxj",
                      web_url: "http://pf.kakao.com/_IxfPfxj",
                    },
                  },
                  {
                    title: "상담하기",
                    link: {
                      mobile_web_url: "http://pf.kakao.com/_IxfPfxj/chat",
                      web_url: "http://pf.kakao.com/_IxfPfxj/chat",
                    },
                  },
                ],
              },
            },
          })
            .then(function (response) {
              console.log(response);
              alert("카카오톡을 확인해주세요");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("권한");
          window.Kakao.Auth.authorize({
            redirectUri: `http://www.kangmin.shop`,
            scope: "talk_message",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        window.Kakao.Auth.authorize({
          redirectUri: "http://www.kangmin.shop",
          scope: "talk_message",
        });
      });
  } catch (err) {
    console.log(err);
  }
}
