<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $helpers = $this->get('app.helpers');


        $em = $this->getDoctrine()->getManager();
        $user_repo = $em->getRepository('BackendBundle:User');
        $user = $user_repo->find(1);
        return $helpers->json($user);
        echo $user->getName()." ".$user->getSurname();
        die();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }

    public function loginAction(Request $request)
    {
      $helpers = $this->get('app.helpers');
      $jwt_auth = $this->get('app.jwt_auth');

      $json = $request->get("json", null);

      if ($json != null) {
        $params = json_decode($json);

        $email = (isset($params->email)) ? $params->email : null;
        $password = (isset($params->password)) ? $params->password : null;
        $getHash = (isset($params->getHash)) ? $params->getHash : null;

        $emailContraint = new Assert\Email();
        $emailContraint->message = "This email is not valid!";

        $validate_email = $this->get("validator")->validate($email, $emailContraint);

        if (count($validate_email) == 0 && $password != null) {

          if ($getHash == null) {
            $signup = $jwt_auth->signup($email, $password);
          } else {
            $signup = $jwt_auth->signup($email, $password, true);
          }

          return new JsonResponse($signup);
        } else {
          return $helpers->json(array(
            'status' => 'error',
            'data' => 'Login not valid!!'
          ));

        }
      } else {
        return $helpers->json(array(
          'status' => 'error',
          'data' => 'Send json with post!!'
        ));
      }


    }
}
