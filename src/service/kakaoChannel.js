export default async function kakaoMessage(setIsSendingMessage, navigate) {
  if (!window.Kakao.isInitialized()) {
    console.log("다시 초기화함");
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }
  try {
    setIsSendingMessage(true);
    window.Kakao.API.request({
      url: "/v2/user/scopes",
      data: {
        scopes: ["talk_message"],
      },
    })
      .then(function (response) {
        console.log(response);
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
                    web_url: "http://pf.kakao.com/_xfxfSBxj",
                    mobile_web_url: "http://pf.kakao.com/_xfxfSBxj",
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
                      mobile_web_url: "http://pf.kakao.com/_xfxfSBxj",
                      web_url: "http://pf.kakao.com/_xfxfSBxj",
                    },
                  },
                  {
                    title: "상담하기",
                    link: {
                      mobile_web_url: "http://pf.kakao.com/_xfxfSBxj/chat",
                      web_url: "http://pf.kakao.com/_xfxfSBxj/chat",
                    },
                  },
                ],
              },
            },
          })
            .then(function (response) {
              console.log(response);
              alert("카카오톡을 확인해주세요");
              setIsSendingMessage(false);
            })
            .catch(function (error) {
              window.Kakao.Auth.authorize({
                redirectUri: "https://www.kangmin.shop",
                scope: "talk_message",
              });
              console.log(error, 1);
            });
        } else {
          console.log("권한");
          window.Kakao.Auth.authorize({
            redirectUri: `https://www.kangmin.shop`,
            scopes: "talk_message",
          });
        }
      })
      .catch(function (error) {
        alert("카카오 로그인을 먼저 해주세요");
        console.log(error, 2);
        navigate("/login");
      });
  } catch (err) {
    console.log(err, 3);
    window.Kakao.Auth.authorize({
      redirectUri: "https://www.kangmin.shop",
      scopes: "talk_message",
    });
  }
}
