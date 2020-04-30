<?php

namespace App\Controller;

use App\Entity\Message;
use App\Kernel;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(MessageRepository $repo)
    {
        $messages = $repo->findAll();
        if (count($messages) == 0) {
            $message = new Message();
        } else {
            $message = $messages[0];
        }
        return $this->render('home/index.html.twig', [
            'message' => $message
        ]);
    }

    /** 
     * @Route("/home", name="home")
     */
    public function home(MessageRepository $repo)
    {
        $messages = $repo->findAll();
        if (count($messages) == 0) {
            $message = new Message();
        } else {
            $message = $messages[0];
        }
        return $this->render('home/home.html.twig', [
            'message' => $message
        ]);
    }

    /** @Route("/send", name="send") */
    public function send(EntityManagerInterface $manager)
    {
        $message = new Message();
        $message->setContent($_POST['content']);
        $manager->persist($message);
        $manager->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/image", name="image")
     */
    public function image(Request $request)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('image');

        $destination = Kernel::getProjectDir() . '/public/uploads/images';
        $originalFileName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $movedFile = $file->move($destination, $originalFileName . '-' . uniqid() . '.' . $file->guessExtension());

        return new JsonResponse(['url' => './uploads/images/' . $movedFile->getFilename()]);
    }
}
