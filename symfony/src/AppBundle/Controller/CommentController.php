<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use BackendBundle\Entity\User;
use BackendBundle\Entity\Video;
use BackendBundle\Entity\Comment;

class CommentController extends Controller
{
  public function newAction(Request $request)
  {
    $helpers = $this->get("app.helpers");

    $hash = $request->get("authorization", null);
    $authCheck = $helpers->authCheck($hash);

    if ($authCheck == true) {
        $identity = $helpers->authCheck($hash, true);

        $json = $request->get("json", null);

        if ($json != null) {
          $params = json_decode($json);

          $createdAt = new \Datetime("now");
          $user_id = (isset($identity->sub)) ? $identity->sub: null;
          $video_id = (isset($params->video_id)) ? $params->video_id : null;
          $body = (isset($params->body)) ? $params->body : null;

          if ($user_id != null && $video_id != null) {
            $em = $this->getDoctrine()->getManager();
            $user_repo = $em->getRepository('BackendBundle:User');
            $user = $user_repo->findOneBy(array(
              "id" => $user_id
            ));

            $video_repo = $em->getRepository('BackendBundle:Video');
            $video = $video_repo->findOneBy(array(
              "id" => $video_id
            ));

            $comment = new Comment();
            $comment->setUser($user);
            $comment->setVideo($video);
            $comment->setBody($body);
            $comment->setCreatedAt($createdAt);

            $em->persist($comment);
            $em->flush();

            $data = array(
              'status' => 'success',
              'code' => 200,
              'msg' => 'comment created success!!'
            );

          } else {
            $data = array(
              'status' => 'error',
              'code' => 400,
              'msg' => 'comment no created!!'
            );
          }

        } else {
            $data = array(
              'status' => 'error',
              'code' => 400,
              'msg' => 'params not valid!!'
            );
        }
    } else {
        $data = array(
          'status' => 'error',
          'code' => 400,
          'msg' => 'authorization not valid!!'
        );
    }

    return $helpers->json($data);

  }

  public function deleteAction(Request $request, $id = null)
  {
    $helpers = $this->get("app.helpers");

    $hash = $request->get("authorization", null);
    $authCheck = $helpers->authCheck($hash);

    if ($authCheck == true) {
        $identity = $helpers->authCheck($hash, true);
        $user_id = ($identity->sub) ? $identity->sub : null;

        $em = $this->getDoctrine()->getManager();
        $comment_repo = $em->getRepository('BackendBundle:Comment');
        $comment = $comment_repo->findOneBy(array(
          "id" => $id
        ));

        if (is_object($comment) && $user_id != null) {
          if (isset($identity->sub) &&
              $identity->sub == $comment->getUser()->getId() ||
              $identity->sub == $comment->getVideo()->getUser()->getId()) {

            $em->remove($comment);
            $em->flush();

            $data = array(
              'status' => 'success',
              'code' => 200,
              'msg' => 'comment deleted success!!'
            );

          } else {
            $data = array(
              'status' => 'error',
              'code' => 400,
              'msg' => 'comment not deleted!!'
            );
          }
        } else {
          $data = array(
            'status' => 'error',
            'code' => 400,
            'msg' => 'comment not deleted!!'
          );
        }

    } else {
        $data = array(
          'status' => 'error',
          'code' => 400,
          'msg' => 'authorization not valid!!'
        );
    }

    return $helpers->json($data);
  }

  public function listAction(Request $request, $id = null)
  {
    $helpers = $this->get("app.helpers");
    $em = $this->getDoctrine()->getManager();

    $video_repo = $em->getRepository('BackendBundle:Video');
    $video = $video_repo->findOneBy(array(
      "id" => $id
    ));

    $comments_repo = $em->getRepository('BackendBundle:Comment');
    $comments = $comments_repo->findBy(array(
      "video" => $video
    ), array('id' => 'desc'));

    if ($comments) {
      $data = array(
        'status' => 'success',
        'code' => 200,
        'data' => $comments
      );
    } else {
      $data = array(
        'status' => 'error',
        'code' => 400,
        'msg' => 'dont exists comments in this video!!'
      );
    }

    return $helpers->json($data);
  }
}
