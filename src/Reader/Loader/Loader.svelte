<script>
  import { BooksIcon } from "@icons";

  //TODO: Create a cool animation of a book morphing into a phone
  //morphing into a laptop, etc.
</script>

<div class="container">
  <div class="spinner" aria-hidden>
    <BooksIcon size={48} />
  </div>
  <p>Calculating page layout</p>
</div>

<style>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .book-spinner {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  .book {
    width: 100%;
    height: 100%;
    fill: #ddd;
    stroke: #333;
    stroke-width: 2px;
  }

  .cover {
    fill: #999;
  }

  .page-1,
  .page-2 {
    fill: #fff;
  }
</style>
